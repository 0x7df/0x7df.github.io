Title: Scripting Safari's Export to PDF function on a Mac
Date: 2017-08-06 18:55
Category:  
Modified: 2017-08-06 18:55
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

Safari has an 'Export to PDF...' item in the 'File' menu which, if you use it a
lot, is something worth automating.

Thanks to [this thread](http://macscripter.net/viewtopic.php?id=41654) on
[MacScripter](http://macscripter.net) this is easy to do using AppleScript.

# Create script

First create the AppleScript script using the native Script Editor app.


1. Open 'Launchpad' and begin typing 'script editor' into the search bar at
   the top to find this app.
   ![Photo]({attach}images/screenshot_launchpad.png)
1. Paste the following script:

        set SaveFolderPath to "~/Documents/Test_PDF_Save_Folder/"
        tell application "Safari" to activate
        tell application "System Events"
            tell process "Safari"
                click menu item "Show Reader" of menu "View" of menu bar 1
                click menu item "Export as PDF…" of menu "File" of menu bar 1
         		repeat until exists sheet 1 of window 1
                    delay 0.02
                end repeat
            	keystroke "g" using {command down, shift down}
            	repeat until exists sheet 1 of sheet 1 of window 1
            	    delay 0.02
            	end repeat
            	tell sheet 1 of sheet 1 of window 1
            	    set value of text field 1 to SaveFolderPath
                    click button "Go"
                end tell
                click button "save" of sheet 1 of window 1
                click menu item "Close Tab" of menu "File" of menu bar 1
            end tell
        end tell
   into the Script Editor:
   ![Photo]({attach}images/screenshot_scripteditor.png)
   This is slightly different from the script at
   [this thread](http://macscripter.net/viewtopic.php?id=41654), in that it
   hard-wires a save folder instead of bringing up a dialogue box each time,
   and also that it puts the web page into reader view before exporting it.

1. Save the script somewhere, e.g.
    `~/Documents/Test_PDF_Save_Folder/safari_export_PDF.scpt`

This script can be run from the command line:

    :::bash
    osascript ~/Documents/Test_PDF_Save_Folder/safari_export_PDF.scpt

to export the currently active tab in Safari to a PDF in the specified
location.

# Create a keyboard shortcut

For extra convenience a keyboard shortcut can be created to run the script.
This uses the 'Automator' app.

1. Start typing 'automator' into the Launchpad search bar:
   ![Photo]({attach}images/screenshot_launchpad2.png)
1. Select 'Service'
   ![Photo]({attach}images/screenshot_automator.png)
1. In the automator app, drag the 'Run shell script' item over to the main
   panel
1. Add the `osascript ~/Documents/Test_PDF_Save_Folder/safari_export_PDF.scpt`
   command
   ![Photo]({attach}images/screenshot_automator2.png)
1. Save the workflow. The default save location is `~/Library/Services`.
1. In the 'System Preferences', go to 'Keyboard', 'Shortcuts', select
   'Services', and select the recently-saved workflow
   ![Photo]({attach}images/screenshot_keyboard_shortcut.png)
1. Choose a shortcut: in this example Shift-Command-E has been chosen

# Summary

Now, after reading an article in Safari, pressing Shift-Command-E saves a PDF
version of the article in the folder specified, and closes the tab.

# Update

I found this script was broken after upgrading from El Capitan to Safari.

    System Events got an error: Can’t get text field 1 of sheet 1 of sheet 1 of
    window 1 of process "Safari". Invalid index.


Solving this required downloading XCode to make available the Accessibility
Inspector, which allows you to point and click on graphical interfaces to get
information on the UI elements. It turns out the `text field` is now a `combo
box`, and changing that in the script got it working again.
