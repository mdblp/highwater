#! /bin/bash -eu

. config/env.sh
exec node --trace_gc --max_old_space_size=48 lib/index.js