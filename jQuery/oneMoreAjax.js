$.when( $.post( "test.php", { name: "John", time: "2pm" }),
        $.post( "other.php" ) )
  .done(function( data1, data2 ) {
    alert( "Data Loaded: " + data1 );
    alert( "Data Loaded: " + data2 );
  });

