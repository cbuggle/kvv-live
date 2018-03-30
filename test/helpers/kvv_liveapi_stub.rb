require 'rspec/mocks/minitest_integration'

include Minitest::RSpecMocks

module SpecHelper
  class KVVLiveapi

    extend Minitest::Spec::DSL

    CONNECTED_STOP_ID = 'de:8212:401'
    UNCONNECTED_STOP_ID = 'de:8212:25'

    def self.stub_requests
      allow( KVV::Liveapi).to receive(:stops_by_name).with('Ka').and_return( expected_json('stops_for_name_ka') )
      allow( KVV::Liveapi).to receive(:stops_by_name).with('Kar').and_return( expected_json('stops_for_name_kar') )
      allow( KVV::Liveapi).to receive(:departures_bystop).with(CONNECTED_STOP_ID).and_return( expected_json( 'departures_for_karl-wilhelm-platz' ) )
      allow( KVV::Liveapi).to receive(:departures_bystop).with(UNCONNECTED_STOP_ID).and_return( expected_json( 'departures_for_wildparkstadtion' ) )
    end

    private

    def self.expectation_file name
      File.read( File.join( Rails.root, 'test', 'fixtures', 'files', "#{name}.json" ))
    end

    def self.expected_json name
      JSON.parse expectation_file( name )
    end
  end
end


class ApplicationSystemTestCase < ActionDispatch::SystemTestCase

  setup do
    SpecHelper::KVVLiveapi.stub_requests
  end
end
