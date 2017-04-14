function App( appStore ) {
    return (
        $( '<div />', {
            html: [
                $( '<form />', {
                    submit: function( e ) {
                        e.preventDefault();
                        appState.save();
                    },
                    html: appStore.state.colors.map( function( color, index ) {
                        var disabled = !appStore.isCustomColor( color );
                        return Color( color, index % 2, disabled, appStore );
                    })
                }),
                appStore.state.notificationShowing ? SuccessNotification() :  null
            ]
        })
    );
}