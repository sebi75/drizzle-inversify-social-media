#!/bin/sh
# wait-for.sh

set -e

host="$(echo $1 | cut -d: -f1)"
port="$(echo $1 | cut -d: -f2)"
shift
shift # this shift is added to remove the '--' from the arguments
cmd="$@"

until nc -z $host $port; do
  echo "MySQL is unavailable - sleeping"
  sleep 1
done

echo "MySQL is up - executing command"

exec $cmd
