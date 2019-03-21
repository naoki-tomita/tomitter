require "redis"
require "grape"
require "faraday"
require "json"

$redis = Redis.new
$client = Faraday.new

def user(cookies)
  response = $client.get "http://localhost/v1/users/identify" do |req|
    req.headers['Cookie'] = "AUTH-SESSION=#{cookies["AUTH-SESSION"]}"
  end
  return [] if response.status != 200
  user = JSON.parse(response.body)
end

def user_tweets(user_id)
  $redis.lrange(user_id, 0, -1)
end

def all_tweets
  $redis.keys.map { |user|
    $redis.lrange(user, 0, -1).map { |item|
      { user: user, list: item }
    }
  }
end

class Tweet < Grape::API
  format :json
  namespace :v1 do
    namespace :tw do
      get "/" do
        all_tweets
      end

      namespace :users do
        get "/me/tweets" do
          user_tweets(user(cookies)["id"])
        end

        post "/me/tweets" do
          result = user(cookies)
          tweet = params[:tweet]
          $redis.rpush(result["id"], tweet)
        end

        get "/:id/tweets" do
          user_tweets(params[:id])
        end
      end
    end
  end
end
