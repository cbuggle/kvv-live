require 'system_test_helper'
require 'helpers/kvv_liveapi_stub'

class AddStopToStopListsTest < ApplicationSystemTestCase

  extend Minitest::Spec::DSL

  let(:search_name){'Kar'}

  let(:stop_name){'Karlsruhe Karl-Wilhelm-Platz'}
  let(:stop_timetable_expectation){'Waldstadt'}   # something from timetable mock

  let(:unconnected_stop_name){'Karlsruhe Wildparkstadtion KSC'} # mind the typo :)
  let(:unconnected_stop_hint){'Für diese Haltestelle stellt der KVV derzeit keine Live-Informationen bereit.'}  # our hint to rescue unconnected stops.

  setup do
    visit '/'
    fill_in "Haltestelle", with: search_name
  end

  test "adds a stop" do
    click_to_add_stop stop_name

    within(:css, ".timetable-list") do
      within(:css, ".timetable") do
        page.must_have_content( stop_name )
        page.must_have_content( stop_timetable_expectation )
      end
    end
  end

  test "adds each stop only once" do
    click_to_add_stop stop_name
    click_to_add_stop stop_name

    within(:css, ".timetable-list") do
      assert page.has_css?(".timetable", count: 1)
    end
  end

  test "adds unconnected stop" do
    # special case where we need to catch inappropriate liveapi.kvv.de response and replace it with a proper user message.
    click_to_add_stop unconnected_stop_name

    within(:css, ".timetable-list") do
      within(:css, ".timetable") do
        page.must_have_content( unconnected_stop_name )
        page.must_have_content( unconnected_stop_hint )
      end
    end
  end
end
