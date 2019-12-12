(ns bff.main)
(require '[ring.adapter.jetty :as jetty]
         '[ring.middleware.params :as params])

(def options {:port 3000 :join? false})
(defn foo-handler [req] {:status 200 :body "foo"})
(defn bar-handler [req] {:status 200 :body "bar"})
(defn not-found-handler [req] {:status 404 :body "Not Found"})
(defn routing []
  (fn [{:keys [uri request-method] :as req}]
    (case [uri request-method]
      ["/foo" :get] (foo-handler req)
      ["/bar" :get] (bar-handler req)
      (not-found-handler req)
      )))

(defn start-server [] (def server (jetty/run-jetty (routing) options)))
(defn -main [] (start-server))
