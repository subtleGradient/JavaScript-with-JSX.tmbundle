#!/usr/bin/env bash -l
[[ -f "${TM_SUPPORT_PATH}/lib/bash_init.sh" ]] && . "${TM_SUPPORT_PATH}/lib/bash_init.sh"

cd "$(dirname "$TM_FILEPATH")"

require_cmd flow
flow "$@" --from TextMate 2> "$TMPDIR/flow-stderr.log"
FlowError="$(<"$TMPDIR/flow-stderr.log")"

if [[ "$FlowError" == *"Could not find a .flowconfig"* ]]; then
  exit_show_tool_tip "$FlowErrorMessage
Flow couldn't find a .flowconfig"
else
  echo "$FlowError" 1>&2
fi

exit $?
