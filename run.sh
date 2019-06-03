# trap
function trap_exit() {
  kill $(ps | egrep '(dotnet|yarn|rackup|gradlew)' | awk '{print $1}') $(jobs -p)
  docker kill $(docker ps -q)
}

trap 'trap_exit' 2

BASE=$PWD

# local-proxy
cd $BASE/environment/local-proxy
./run.sh &

# link db
cd $BASE/environment/link/db
./run.sh &

# tweet db
cd $BASE/environment/tweet/db
./run.sh &

# link
cd $BASE/link
./run.sh &

# profiles
cd $BASE/profiles
yarn start &

# tweet
cd $BASE/tweet
./run.sh &

# users
cd $BASE/users
./gradlew run &

# web
cd $BASE/web
yarn start &

wait
