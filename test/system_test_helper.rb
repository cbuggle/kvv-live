require "test_helper"

Capybara.register_driver :headless_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chromeOptions: { args: %w(headless disable-gpu) }
  )

  Capybara::Selenium::Driver.new app,
    browser: :chrome,
    desired_capabilities: capabilities
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :headless_chrome

  private

  def click_to_add_stop stop_name
    within(:css, ".stop-suggestions") do
      click_on stop_name
    end
  end

end

ActionDispatch::SystemTesting::Server.silence_puma = true
