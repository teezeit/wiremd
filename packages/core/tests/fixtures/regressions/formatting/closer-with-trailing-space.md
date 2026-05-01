<!-- regression: a `:::` closer with trailing whitespace (`::: `) should still
     close the container. Currently the trailing space prevents the regex
     match, so the container stays open and following content gets absorbed. -->
::: card
inside
::: 
text after the (broken) closer
