<?php
$news_args = array(
	'post_type'      => 'post',
	'post_status'    => 'publish',
	'posts_per_page' => 12,
	'order'          => 'DESC',
	'orderby'        => 'date'
);
$news_query = new WP_Query($news_args);
get_header();
?>
<main id="primary" class="site-main news__page">
	<section class="news__banner global__banner hero-section"></section>
	<section class="news__section">
		<div class="container">
			
		</div>
	</section>
</main>

<?php

get_footer();
