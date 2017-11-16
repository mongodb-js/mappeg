stage
  = begin_object stage:stage_operation? end_object
    { return { stage: stage } }

stage_operation
  = coll_stats

coll_stats
  = quote
    "$collStats"
    quote
    name_separator
    begin_object
    (latency_stats / storage_stats)?
    end_object
    { return { operator: "$collStats", argument: "{}" } }

latency_stats
  = quote "latencyStats" quote name_separator latency_stats_options

latency_stats_options
  = begin_object end_object

storage_stats
  = quote "storageStats" quote name_separator begin_object end_object

begin_object
  = _ "{" _

end_object
  = _ "}" _

_ "whitespace"
  = [ \t\n\r ]*

quote
  = '"' / "'"

name_separator
  = _ ":" _

boolean
  = "true" / "false"
