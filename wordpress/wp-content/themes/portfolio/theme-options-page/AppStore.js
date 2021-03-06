function AppState( theme ) {
    var theme = theme;
    if ( !theme.colors.custom_colors ) {
        theme.colors.custom_colors = [];
    }
    var state = {
        colors: getColors( theme ),
        units: theme.units,
        notificationShowing: false
    };
    var subscriptions = [];

    function subscribe( subscriber ) {
        subscriptions.push( subscriber );
    }

    function onUpdate() {
        subscriptions.forEach( function( subscription ) {
            subscription( state );
        });
    }

    function duplicateColor( color ) {
        // clone color
        var clone = $.extend( {}, color );
        clone.name = clone.name + ' copy';
        clone.order++;

        // adjust the list order
        var colors = getColors();
        var oldIndex = colors.indexOf( color );
        var restOfColors = colors.slice( oldIndex + 1 );
        // increment the proceeding colors' order
        restOfColors.forEach( function( color ) {
            color.order++;
        });

        // add the new color
        theme.colors.custom_colors.push( clone );

        // update state
        state.colors = getColors( theme );
        
        onUpdate();
    }

    function moveColorUp( color ) {
        var colors = getColors();
        var index = colors.indexOf( color );
        if ( index <= 0 ) {
            return;
        }
        var previousColor = colors[ index - 1 ];
        var order = color.order;
        color.order = previousColor.order;
        previousColor.order = order;
        state.colors = getColors( theme );
        onUpdate();
    }

    function moveColorDown( color ) {
        var colors = getColors();
        var index = colors.indexOf( color );
        if ( index >= colors.length - 1 ) {
            return;
        }
        var nextColor = colors[ index + 1 ];
        var order = color.order;
        color.order = nextColor.order;
        nextColor.order = order;
        state.colors = getColors( theme );
        onUpdate();
    }

    function removeColor( color ) {
        var index = theme.colors.custom_colors.indexOf( color );
        if ( index === -1 ) {
            return;
        }
        if ( window.confirm( 'Are you sure you want to delete ' + color.name + '?' ) ) {
            theme.colors.custom_colors.splice( index, 1 );
            state.colors = getColors( theme );
            onUpdate();
        }
    }

    function isCustomColor( color ) {
        return theme.colors.custom_colors.indexOf( color ) > -1;
    }

    function getColors() {
        var colors = theme.colors.custom_colors.slice( 0 );
        // push the 'permanent' colors
        colors.push( theme.colors.footer_color );
        colors.push( theme.colors.primary_font_color );
        colors.push( theme.colors.secondary_font_color );
        colors.sort( function( a, b ) {
            return a.order > b.order;
        });

        return colors;
    }

    function setColorName( color, name ) {
        color.name = name;
        onUpdate();
    }

    function setColorValue( color, value ) {
        color.value = value;
    }

    function setUnitValue( unit, value ) {
        unit.value = value;
    }

    function save() {
        $.post( document.location.href, { theme: theme } )
            .done( function() {
                state.notificationShowing = true;
                onUpdate();
                setTimeout( function() {
                    state.notificationShowing = false;
                    onUpdate();
                }.bind( this ), 4000 );
            }.bind( this ));
    }

    return {
        subscribe: subscribe,
        state: state,
        duplicateColor: duplicateColor,
        moveColorUp: moveColorUp,
        moveColorDown: moveColorDown,
        removeColor: removeColor,
        isCustomColor: isCustomColor,
        setColorName: setColorName,
        setColorValue: setColorValue,
        setUnitValue: setUnitValue,
        save: save
    };
}