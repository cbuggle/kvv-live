# README

KVV Live is a small app providing live KVV (Karlsruhe Transport Agency) timetable information for selected stops.
It is a React App consuming from a Ruby on Rails JSON API app (i.e. without database).
It was written mainly for the purpose of demonstrating how this is accomplished (and it might serve in a tutorial anytime soon.)


## Installation

    $git clone git@github.com:buggle/kvv-live.git

    $cd kvv-live

    $bundle install
    $yarn install
    $bundle exec rails s

Then open your favorite browser and navigate to 'localhost:3000'.

## Tests

All tests are system tests running throught the entire stack. To run the test suite, type

    $bundle exec rails test:system


## The KVV Live API

KVV-Live is based on the gem 'kvv-liveapi' (https://github.com/buggle/kvv-liveapi) by the same author.
This gem provides a ruby binding to the KVV live web API (public but unofficial and undocumented).

Similiar projects in other languages that I know of:

PHP:
https://github.com/MartinLoeper/KVV-PHP-unofficial-/wiki/Live-API

Python:
https://pypi.python.org/pypi/kvvliveapi


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/buggle/kvv-live.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
