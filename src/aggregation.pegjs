stage
  = begin_object exp:expression end_object
    { return { expression: exp } }

expression
  = (
      quote op:operator quote name_separator arg:argument
      { return { operator: op, argument: arg } }
    )?

argument
 = "{}"

operator
  = "$collStats"

begin_object
  = _ "{" _

end_object
  = _ "}" _

_ "whitespace"
  = [ \t\n\r ]*

quote = '"' / "'"

name_separator = _ ":" _
