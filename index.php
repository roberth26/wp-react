<?php 
define( 'WP_USE_THEMES', false );
require_once dirname( __FILE__ ) . '/wordpress/wp-load.php';
if ( $_SERVER[ 'HTTP_HOST' ] === 'localhost' && $_GET[ 'inline' ] != true ) {
    // load from webpack-dev-server
    $app_script = '<script src="http://localhost:3000/app.bundle.js"></script>';
} else {
    $app_script = '<script>' . file_get_contents( 'dist/app.bundle.js' ) . '</script>';
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php bloginfo( 'name ' ) ?></title>
        <meta name="description" content="<?php bloginfo( 'description' ) ?>" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script>
            (function(d) {
                var config = {
                    kitId: 'kpe6ewq',
                    scriptTimeout: 3000,
                    async: true
                },
                h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script>
            window.__PORTFOLIO_DATA__ = <?php require_once 'wordpress-data.php' ?>;
        </script>
        <?= $app_script ?>
    </body>
</html>