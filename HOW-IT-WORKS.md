# How it works

MADDY YOU'RE SUPER TIRED GO TO BED BUT THIS IS WHAT YOU SHOULD TALK ABOUT:

* `refresh` runs daily, fetching information about the 56,250 most recent posts
* `run_reports` runs daily, weekly, and monthly, running reports with the specified frequency
* Reports run and store the results in run objects. Only the specified number of runs are kept per report (defaults to 1)
