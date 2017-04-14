function Color( color, dark, disabled, appStore ) {
    return (
        $( '<div />', {
            css: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
                backgroundColor: dark ? 'rgba( 0, 0, 0, .05 )' : ''
            },
            html: [
                $( '<button />', {
                    css: {
                        height: 30,
                        width: 30,
                        paddingTop: 5,
                        marginRight: 15
                    },
                    'class': 'dashicons-before dashicons-plus',
                    type: 'button',
                    click: function() {
                        appStore.duplicateColor( color );
                    }
                }),
                $( '<button />', {
                    css: {
                        height: 30,
                        width: 30,
                        paddingTop: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0
                    },
                    'class': 'dashicons-before dashicons-arrow-up-alt2',
                    type: 'button',
                    click: function() {
                        appStore.moveColorUp( color );
                    }
                }),
                $( '<button />', {
                    css: {
                        height: 30,
                        width: 30,
                        paddingTop: 5,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeftWidth: 0
                    },
                    'class': 'dashicons-before dashicons-arrow-down-alt2',
                    type: 'button',
                    click: function() {
                        appStore.moveColorDown( color );
                    }
                }),
                $( '<input />', {
                    css: {
                        marginLeft: 15,
                        height: 30,
                        flex: 1
                    },
                    value: color.name,
                    readonly: disabled,
                    disabled: disabled,
                    type: 'text',
                    'placeholder': 'Color Name',
                    change: function( e ) {
                        appStore.setColorName( color, e.target.value );
                    }
                }),
                $( '<input />', {
                    css: {
                        height: 30,
                        flex: 1,
                        marginRight: 15,
                        maxWidth: '25%'
                    },
                    value: color.value,
                    type: 'color',
                    change: function( e ) {
                        appStore.setColorValue( color, e.target.value );
                    }
                }),
                $( '<button />', {
                    css: {
                        height: 30,
                        width: 30,
                        paddingTop: 2,
                    },
                    'class': 'dashicons-before dashicons-trash',
                    type: 'button',
                    disabled: disabled,
                    click: function() {
                        appStore.removeColor( color );
                    }
                })
            ]
        })
    );
}