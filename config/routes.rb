Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/' => 'application#index'

  get "stops/byname/:name" => "timetable_form#stops_byname", format: :json
  get "departures/bystop/:id" => "timetable_form#departures_bystop", format: :json
end
