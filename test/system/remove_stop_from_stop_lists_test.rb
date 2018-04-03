require 'system_test_helper'
require 'helpers/kvv_liveapi_stub'

class RemoveStopFromStopListsTest < ApplicationSystemTestCase

  extend Minitest::Spec::DSL

  let(:search_name){'Kar'}
  let(:stop_name){'Karlsruhe Karl-Wilhelm-Platz'}

  setup do
    visit '/'
    fill_in "Haltestelle", with: search_name
  end

  test "removes a stop" do
    skip "Removing timetables not yet implemented"

    click_to_add_stop stop_name

    within(:css, ".timetable-list") do
      within(:css, ".timetable") do
        page.must_have_content( stop_name )
        click_on "x"
      end
    end

    within(:css, ".timetable-list") do
      within(:css, ".timetable") do
        page.must_not_have_content( stop_name )
      end
    end
  end
end
