stage
  = expression

expression
 = begin_object end_object
   { return { expression: {}} }

begin_object
  = _ "{" _

end_object
  = _ "}" _

_ "whitespace"
  = [ \t\n\r ]*
