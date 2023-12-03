#!/bin/sh
echo "renew cert"

if sudo service nginx stop ; then
  echo "shutdown nginx successful"
else
  echo "shutdown nginx failed"
  exit 1
fi

if sudo certbot renew ; then
  echo "cert renew successful"
else
  echo "cert renew failed"
  exit 1
fi

if sudo service nginx restart ; then
  echo "restart nginx successful"
else
  echo "restart nginx failed"
  exit 1
fi
