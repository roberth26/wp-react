<?php
    header( 'Content-type: application/xml' );
    $url = 'https://' . $_SERVER[ 'HTTP_HOST' ];
?>
<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <?php
        ob_start();
        require( 'wordpress_data.php' );
        $data = json_decode( ob_get_clean() );
        foreach ( $data->pages as $page ) : ?>
            <url>
                <loc><?= $url . $page->custom_fields->url ?></loc>
                <lastmod><?= ( new DateTime( $page->post_modified ) )->format( DateTime::W3C ) ?></lastmod>
                <changefreq>daily</changefreq>
                <priority>1</priority>
            </url>
        <?php endforeach;
        $portfolios = array_filter( $data->pages, function( $page ) {
            return $page->template === 'portfolio';
        });
        foreach ( $portfolios as $portfolio ) :
            $portfolioUrl = $portfolio->custom_fields->url;
            foreach ( $data->projects as $project ) : ?>
                <?php $projectUrl = $project->custom_fields->project_url; ?>
                <url>
                    <loc><?= $url . $portfolioUrl . $projectUrl ?></loc>
                    <lastmod><?= ( new DateTime( $page->post_modified ) )->format( DateTime::W3C ) ?></lastmod>
                    <changefreq>daily</changefreq>
                    <priority>.8</priority>
                </url>
            <?php endforeach;
        endforeach;
    ?>
</urlset>