// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-vip-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

let config = require('../../server/config.json')
let path = require('path')
let senderAddress = "noreply@loopback.com" // Replace this address with your actual address

module.exports = function(Vip) {
  // send verification email after registration
  Vip.afterRemote('create', function(context, vip, next) {
    let options = {
      type: 'email',
      to: vip.email,
      from: senderAddress,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      vip: vip
    }

    vip.verify(options, function(err, response) {
      if (err) {
        Vip.deleteById(vip.id)
        return next(err)
      }
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      })
    })
  })

  // Method to render
  Vip.afterRemote('prototype.verify', function(context, vip, next) {
    context.res.render('response', {
      title: 'A Link to reverify your identity has been sent ' +
        'to your email successfully',
      content: 'Please check your email and click on the verification link ' +
        'before logging in',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    })
  })

  // send password reset link when requested
  Vip.on('resetPasswordRequest', function(info) {
    let url = 'http://' + config.host + ':' + config.port + '/reset-password'
    let html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password'

    Vip.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email')
      console.log('> sending password reset email to:', info.email)
    })
  })

  // render UI page after password change
  Vip.afterRemote('changePassword', function(context, vip, next) {
    context.res.render('response', {
      title: 'Password changed successfully',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    })
  })

  // render UI page after password reset
  Vip.afterRemote('setPassword', function(context, vip, next) {
    context.res.render('response', {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    })
  })
}
