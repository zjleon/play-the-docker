package com.androidApp;

import android.util.Log;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      Log.i("bbb", "1111");
      return BuildConfig.DEBUG;
//       return false;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      Log.i("bbb", "2222");
      return Arrays.<ReactPackage>asList(
          new MainReactPackage()
      );
      // return Collections.emptyList();
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    Log.i("aaaa","==================");
      return mReactNativeHost;
  }
}
