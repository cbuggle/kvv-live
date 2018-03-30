ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

require 'support/simplecov'

require 'minitest/autorun'

require 'capybara/rails'
require 'capybara/minitest'
require 'capybara-screenshot/minitest'


class ActionDispatch::IntegrationTest
  # Make the Capybara DSL available in all integration tests
  include Capybara::DSL
  # Make `assert_*` methods behave like Minitest assertions
  include Capybara::Minitest::Assertions

  # Reset sessions and driver between tests
  # Use super wherever this method is redefined in your individual test classes
  def teardown
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end
end

Capybara::Screenshot.prune_strategy = { keep: 3 }
Capybara.save_path = "tmp/capybara"

Minitest::Reporters.use! [Minitest::Reporters::SpecReporter.new]


