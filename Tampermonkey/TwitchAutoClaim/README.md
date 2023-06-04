THe first time the script finds a progress bar it will record the current time and progress. The script will use a default refresh rate, assuming a drop time of 30m, so the script will first refresh the page assuming it will be a percentage of that time.

On future loads, following a refresh, the script will use the initial time and progress, along with the current time and progress, to calculate the actual rate of the drop, and will refresh accordingly.

A minimum refresh rate is used, as the longer the timeframe the more accurate the script can calculate when 100% will be reached.

On a 4hr drop it will take 144s for the progress to move 1%. So, when loading a page it may be 144s until the next change, or 1s. The script will set different refresh periods, in an attempt to work out when the initial progress value actually changed.

When the script knows that the next refresh should allow it to claim, it will attempt to calculate the final refresh using the information it has calculated.

In this manner the script will limit the page refreshes it makes, so as not to trigger bot detection, which I was experiencing with other scripts. It should also claim the drop soon after it is available, as it has previously approximated when the progress will reach 100%.