require 'system_test_helper'
require 'helpers/kvv_liveapi_stub'

class StopSuggestionsTest < ApplicationSystemTestCase

  setup do
    visit "/"
  end

  test "typing suggests 20 stops" do
    fill_in "Haltestelle", with: "Kar"
    within('.stop-suggestions') do
      assert page.has_content? "Karlsruhe Karl-Wilhelm-Platz"
      assert page.has_content? "Karlsruhe Europaplatz (Karlstr.)"
      assert page.has_css?(:li, count: 20)
    end
  end
end
