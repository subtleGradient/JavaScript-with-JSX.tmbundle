#!/usr/bin/env bash

Bookmarks="$TMPDIR/.TextMate_Cursor_History.urls"

echo "txmt://open?url=file://${TM_FILEPATH// /%20}&line=$TM_LINE_NUMBER&column=$TM_COLUMN_NUMBER" >> "$Bookmarks"
