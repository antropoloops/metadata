(ns app.core
  (:require
    [reagent.core :as reagent :refer [atom]]
    [ajax.core :refer [GET POST]]))

(def endpoint "https://antropoloops.github.io/metadata/songs.json")

(enable-console-print!)

;; define your app data so that it doesn't get over-written on reload
(defonce app-state (atom {:songs {} :text "Sin datos."}))

(defn loadSongs [response]
  (swap! app-state assoc :songs response))

(defn logData [response]
  (swap! app-state assoc :text (str response)))

(GET endpoint {:handler loadSongs})

(defn song [[key val]]
  [:li [:a {:href key } val]])

(defn app []
  [:div
    [:h1 "Antropoloops songs"]
    (map song (seq (:songs @app-state)))])

(defn render []
  (reagent/render-component [app]
                          (. js/document (getElementById "app"))))

(render)
