The first time the script finds a progress bar it will record the current time and progress. The script will use a default refresh rate, assuming a drop time of 30m, so the script will first refresh the page assuming it will be a percentage of that time. E.g.: If the progress is 20% the first refresh will be 80x18, or 1440s.

Following a refresh, the script will use the initial time and progress, along with the current time and progress, to calculate the actual rate of the drop, and will calculate the next refresh accordingly.

A minimum refresh time is used, as the longer the timeframe the more accurate the script can calculate when 100% will be reached. Therefore on a 4hr drop the script will still refresh a small number of times, attempting to improve accuracy on each refresh.

On a 4hr drop it will take 144s for the progress to increase 1%. So, when loading the inventory page it may be 144s until the next change, or 1s. In an attempt to work out when the initial progress value actually changed the script will set different refresh periods, and reduce the base time where possible.

When the script calculates that the next refresh should allow it to claim the drop, it will use the stored base time, the progress rate, and the seconds elapsed, to calculate the time remaining as accurately as possible.

In this manner the script will limit the page refreshes it makes, so as not to trigger bot detection, which I was experiencing with other scripts. It should also claim the drop soon after it is available, as it has previously approximated when the progress will reach 100%.

The script relies on knowing that there was a start time and progress value, and that the progress will increase on each refresh. If there is no increase it will start over, as it cannot perform it's calculations otherwise. Therefore, it is best left alone, unless you choose to reset it, with two quick manual refreshes. 

Please refer to the console for some relevant information.