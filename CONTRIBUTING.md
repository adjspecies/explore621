# Contributing

Woo! You're more than welcome to contribute! Everything takes place on our [GitHub repo](https://github.com/adjspecies/explore621).

Here's what you need to know.

## Building

This is a Django project running on Python 3. As such, you'll need to get a python environment up and running. We suggest the following:

```bash
# Get the project
git clone git@github.com:[YOUR USER]/explore621
cd explore621

# Set up a virtualenv
virtualenv venv --python=`which python3`
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up your dev database
cd e621
./manage.py migrate

# Import some data (this will take a while...)
./manage.py refresh

# Run the server
./manage.py runserver
```

You should then be able to navigate to 127.0.0.1:8000 and see everything up and running.

## Working on the site.

There's likely one thing you'll want to do more than any other with the project, and that's work with reports. Each report relies on a runner, which is the bit of code that actually munges the data from the database and stores it in a result. Runners come in two parts: the bit that grabs the data, and the bit that displays that.

### Grabbing the data

You can add or modify runners in `reports/runners/`. Each of these extends `reports.runners.base.BaseRunner`, and should implement the `run` and `generate_result` methods. `run` generally performs all of the database heavy lifting and usually stores the result in `self.result`, while `generate_result` calls `self.set_result` to set the string that will be passed to the front end. In practice, the content of `generate_result` is usually just `self.set_result(json.dumps(self.result))`.

If you add a new runner, you will need to add it to the `RUNNERS` dict in `reports/runners/__init__.py` so that it can be used by `reports.models.Report.run`.

Runners can accept attributes from reports. Each report has an `attributes` attribute which contains a JSON string. In `BaseRunner`, this string is loaded, and then the key/value pairs added to the runner as class attributes. That is, if your report has the `attributes='{"tags":["fox","wolf"]}'`, then your runner will wind up with `self.tags = ['fox', 'wolf']`. If you want to require a tag, you can use `ensure_attribute` within the runner's `__init__()`, and if you want a tag to be optional but have a default value, you can use `default_attribute`:

```python

class MyRunner(BaseRunner):

    def __init__(self, report):
        super().__init__(report)
        self.ensure_attribute('tags')
        self.default_attribute('count', 1)

    # ...
```

This is also the place to check the content of tags.

Finally, runners should have a `help_text` attribute which contains a markdown string describing it and listing expected attributes. See the existing runners for the expected style.

### Displaying the data

For each runner, there exists a means of displaying it using JavaScript and SVG. This is done through a function in `static/js/runners.js` named exactly the same as the runner in the `RUNNERS` dict above. This should simply get the container element using d3 and pass off the heavy lifting to a function in `static/js/vis.js`. There are a few existing visualization utilities available in there, so consider using (or modifying) one of those before writing a new one!

### Building a report

If you've got a report you would like to see that would be served by one of the runners, you can easily do that in Python land. Get into the Django shell by running `./manage.py shell` and then use that as your playground.

```python
from reports.models import Report

report = Report(title='foo', description='bar', frequency='on_demand', runner='MyRunner', attributes='{"baz":"qux"}')
report.save()
run = report.run()
run.result
# ...
```

When you have something that you like and want to see implemented on explore621, create a pull request with your runner changes if needed, then file an issue with the report you would like to see (using the constructor as above, if possible!).
