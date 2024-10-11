<?php
get_header();
?>
<main id="primary" class="site-main single__news__page">
	<section class="post__section">
		<div class="post__container">
			<?php
			while (have_posts()) :
				the_post();
				$author_array = get_field('author_box');
				$author_count = $author_array ? count($author_array) : null;
				function genAuthorClass($author_count)
				{
					return $author_count ? "post__author__$author_count" : "no__post__author";
				}

				$author_css_class = genAuthorClass($author_count);
				function post_author_data($author)
				{
					if (isset($author['author_company'])) {
						echo '<p class="post__author__company">' . htmlspecialchars($author['author_company']) . '</p>';
					}
					if (isset($author['author_name'])) {
						echo '<p class="post__author__name">' . htmlspecialchars($author['author_name']) . '</p>';
					}
					if (isset($author['author_designation'])) {
						echo '<p class="post__author__designation">' . htmlspecialchars($author['author_designation']) . '</p>';
					}
					if (isset($author['author_phone'])) {
						echo '<p class="post__author__phone">' . htmlspecialchars($author['author_phone']) . '</p>';
					}
					if (isset($author['author_email'])) {
						echo '<p class="post__author__email"><a href="mailto:' . htmlspecialchars($author['author_email']) . '">' . htmlspecialchars($author['author_email']) . '</a></p>';
					}
				}

			?>
				<div class="post__col__left">
					<div class="post__thumbnail">
						<img src="<?php the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>">
					</div>
					<div class="post__author_wrapper post__author_desk <?php echo $author_css_class; ?>">
						<?php
						if ($author_array) : ?>
							<?php foreach ($author_array as $author) : ?>
								<div class="post__author__box">
									<?php post_author_data($author); ?>
								</div>
							<?php endforeach; ?>
						<?php endif; ?>
					</div>
				</div>
				<div class="post__col__right">
					<h1 class="post__top">
						<span class="post__preheading">news</span>
						<span class="post__heading"><?php the_title(); ?></span>
					</h1>
					<?php if (get_field('post_explainer')) : ?>
						<h2 class="post__explainer"><?php the_field('post_explainer'); ?></h2>
					<?php endif; ?>
					<div class="post__meta">
						<div class="meta__news-info meta__news-info__desk">
							<?php if (get_field('news_location')) : ?>
								<p class="post__location"><?php the_field('news_location'); ?> <span class="location__dash">–</span></p>
							<?php endif; ?>
							<p class="post__date"><?php echo get_the_date('F j, Y'); ?></p>
							<?php if (get_field('post_publication')) : ?>
								<p class="post__publication">/<?php the_field('post_publication'); ?>/</p>
							<?php endif; ?>
						</div>
						<div class="meta__news-info meta__news-info__mob">
							<p>
								<?php if (get_field('news_location')) : ?>
									<span class="post__location"><?php the_field('news_location'); ?> –</span>
								<?php endif; ?>
								<span class="post__date"><?php echo get_the_date('F j, Y'); ?></span>
								<?php if (get_field('post_publication')) : ?>
									<span class="post__publication">/<?php the_field('post_publication'); ?>/</span>
								<?php endif; ?>
							</p>
						</div>
						<div class="meta__news-back"><a href="javascript:void(0)" onclick="backNews()">BACK TO NEWS</a></div>
					</div>
					<div class="post__thumbnail_mobile">
						<img src="<?php the_field('mobile_image') ?>" alt="<?php the_title(); ?>">
					</div>
					<div class="post__content <?php echo $author_count === NULL ? "post__no-padding" : "" ?>">
						<?php the_content(); ?>
						<div class="meta__news-back meta__news-back-desk"><a href="javascript:void(0)" onclick="backNews()">BACK TO NEWS</a></div>
					</div>
					<div class="post__author_wrapper post__author_tab <?php echo $author_css_class; ?>">
						<?php
						if ($author_array) : ?>
							<?php foreach ($author_array as $author) : ?>
								<div class="post__author__box">
									<?php post_author_data($author); ?>
								</div>
							<?php endforeach; ?>
						<?php endif; ?>
					</div>
					<div class="meta__news-back meta__news-back-tab"><a href="javascript:void(0)" onclick="history.go(-1)">BACK TO NEWS</a></div>
				</div>
			<?php
			endwhile;
			?>
		</div>
		<div class="meta__news-back meta__news-back-mbl"><a href="javascript:void(0)" onclick="history.go(-1)">BACK TO NEWS</a></div>
	</section>
</main>
<?php
get_footer();
