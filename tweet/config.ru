require './rest'
run Rack::Cascade.new [Tweet]
