class TimetableFormController < ApiController

  def stops_byname
    stops = KVV::Liveapi.stops_by_name params[:name]
    render json: stops
  end

  def departures_bystop
    timetable = KVV::Liveapi.departures_bystop params[:id]
    render json: timetable
  end
end
