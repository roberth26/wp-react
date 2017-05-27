function App( appStore ) {
    return (
        $( '<div />', {
            html: [
                $( '<form />', {
                    submit: function( e ) {
                        e.preventDefault();
                        appStore.save();
                    },
                    html: (
                        $( '<div />' ).append(
                            $( '<h2>Colors</h2>' )
                        ).append(
                            appStore.state.colors.map( function( color, index ) {
                                var disabled = !appStore.isCustomColor( color );

                                return Color( color, index % 2, disabled, appStore );
                            })
                        ).append(
                            $( '<h2>Units</h2>' )
                        ).append(
                            appStore.state.units.map( function( unit, index ) {
                                return Unit( unit, index % 2, appStore );
                            })
                        )
                    )
                }),
                appStore.state.notificationShowing ? SuccessNotification() :  null
            ]
        })
    );
}