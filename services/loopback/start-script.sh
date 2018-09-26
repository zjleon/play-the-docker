#!/bin/bash
Counter=1
echo -n "waiting for $WEB_DB_HOST ..."
while (($Counter == 1))
do
   if ping -c 1 -w 5 $WEB_DB_HOST &> /dev/null
   then
      echo "Online!"
      Counter=0
   else
      echo -n "."
   fi
done
node .
