(require '[figwheel-sidecar.repl-api :as ra])

;; this will start figwheel and will start autocompiling the builds specified in `:builds-ids`
(ra/start-figwheel!
  {:figwheel-options {} ;; <-- figwheel server config goes here
   :build-ids ["dev"]   ;; <-- a vector of build ids to start autobuilding
   :all-builds          ;; <-- supply your build configs here
   [{:id "dev"
     :figwheel true
     :source-paths ["src"]
     :compiler {:main "example.core"
                :asset-path "out"
                :output-to "resources/public/main.js"
                :output-dir "resources/public/out"
                :verbose true}}]})

;; you can also just call (ra/start-figwheel!)
;; and figwheel will do its best to get your config from the
;; project.clj or a figwheel.edn file

;; start a ClojureScript REPL
(ra/cljs-repl)
;; you can optionally supply a build id
;; (ra/cljs-repl "dev")
