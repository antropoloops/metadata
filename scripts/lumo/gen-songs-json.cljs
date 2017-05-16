(def fs (js/require "fs"))

(def toSlug (js/require "to-slug-case"))

(def data
  (js->clj
    (js/require "../data/BDloops.json")))


(def titles (distinct (map #(get % "antropoloop") data)))

(def slugs (map toSlug titles))

(def names (zipmap slugs titles))

(def json (.stringify js/JSON (clj->js names) nil 2))

(.writeFileSync fs "../../songs.json" json)

;(println (js->cljs (first data)))
