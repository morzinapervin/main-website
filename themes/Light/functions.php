<?php
if (!defined('CUSTOM_THEME_VERSION')) {
	// Replace the version number of the theme on each release.
	define('CUSTOM_THEME_VERSION', '1.1.0');
}

function custom_theme_setup()
{

	// Add default posts and comments RSS feed links to head.
	add_theme_support('automatic-feed-links');
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__('Primary', 'custom_theme_menu'),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
	*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'custom_theme_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support('customize-selective-refresh-widgets');
}
add_action('after_setup_theme', 'custom_theme_setup');


/**
 * Enqueue scripts and styles.
 */
function custom_theme_scripts()
{
	// Preconnect for Google Fonts
	add_action('wp_head', function () {
		echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
		echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
	});
	// For Loading jQuery
	wp_enqueue_script('jquery');
	wp_enqueue_style('custom_theme_style', get_stylesheet_uri(), array(), CUSTOM_THEME_VERSION);

	wp_enqueue_script('custom_theme_navigation', get_template_directory_uri() . '/js/navigation.js', array(), CUSTOM_THEME_VERSION, true);
	wp_enqueue_script('header-js', get_template_directory_uri() . '/js/header.js?v=atl', array(), CUSTOM_THEME_VERSION, true);

	// Enqueue GSAP from CDN
	wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js', array(), '3.11.4', true);
	wp_enqueue_script('gsap_scroll_trigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js', array('gsap'), '3.11.4', true);


	// wp_enqueue_style('obsidian_font', get_theme_file_uri('assets/fonts/obsidian/1E1D39DE2350C084B.css'));
	
	// Custpm Google Fonts
	wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Open+Sans:ital,wdth,wght@0,75..100,300..800;1,75..100,300..800&display=swap', array(), null);
	
	// Main CSS File
	wp_enqueue_style('custom_css', get_theme_file_uri('styles/main.css?v=dlf'), array(), null);

	if (is_page('team')) {
		wp_enqueue_style('team_styles', get_theme_file_uri('styles/team.css?v=cer'), array(), null);
		wp_enqueue_script('team-js', get_template_directory_uri() . '/js/team.js?v=rtew', array(), null, true);
	}

	if (is_page('portfolio')) {
		wp_enqueue_style('news-css', get_theme_file_uri('./styles/news.css?v=yru'), array(), null);
		wp_enqueue_style('team_styles', get_theme_file_uri('./styles/team.css?v=cmb'), array(), null);
		wp_enqueue_style('portfolio-css', get_theme_file_uri('./styles/portfolio.css?v=moi'), array(), null);
		wp_enqueue_script('animation-js', get_template_directory_uri() . '/js/animation.js', array(), CUSTOM_THEME_VERSION, true);
		wp_enqueue_script('portfolio-js', get_template_directory_uri() . '/js/portfolio.js?v=pyer', array('jquery'), CUSTOM_THEME_VERSION, true);
		wp_localize_script('portfolio-js', 'wp_ajax', array('ajaxurl' => admin_url('admin-ajax.php')));
		wp_enqueue_script('portfolio-animation', get_template_directory_uri() . '/js/scroll-animation.js', array(), null, true);
	}
	// Home page style
	if (is_front_page()) {
		wp_enqueue_style('home-page-styles', get_theme_file_uri('./styles/home.css?v=rvs'), array(), null);
		wp_enqueue_script('home-page-script', get_theme_file_uri('/js/home.js'), array(), null, true);
	}

	//header & footer css
	wp_enqueue_style('header_css', get_theme_file_uri('styles/header.css?v=qfl'), array(), null);
	wp_enqueue_style('footer_css', get_theme_file_uri('styles/footer.css?v=atj'), array(), null);
	
	// News PAGE CSS AND JS
	if (is_page('news')) {
		wp_enqueue_style('news-css', get_theme_file_uri('./styles/news.css?v=lom'), array(), null);
		wp_enqueue_script('news-js', get_template_directory_uri() . '/js/news.js?v=nrt', array('jquery'), CUSTOM_THEME_VERSION, true);
		wp_localize_script('news-js', 'ajaxparams', array('ajaxurl' => admin_url('admin-ajax.php')));
		wp_enqueue_script('news-animation', get_template_directory_uri() . '/js/scroll-animation.js', array(), null, true);
	}

	// 404 Page CSS
	if (is_404()) {
		wp_enqueue_style('404-css', get_theme_file_uri('./styles/404.css?v=fjs'), array(), null);
	}

    // approach Page CSS
	if (is_page('approach')) {
		wp_enqueue_style('approach-css', get_theme_file_uri('./styles/approach.css?v=aps'), array(), null);
		wp_enqueue_script('appr-page-script', get_theme_file_uri('/js/approach.js?v=ews'), array(), null, true);
		// wp_enqueue_script('appr-anim-page-script', get_theme_file_uri('/js/background-animation.js'), "", '', true);
	}

	// SINGLE NEWS PAGE CSS AND JS
	if (is_singular('post')) {
		wp_enqueue_style('single-news-css', get_theme_file_uri('./styles/single-news.css?v=swe'), array(), null);
		wp_enqueue_script('single-news-js', get_template_directory_uri() . '/js/single-news.js?v=mbt', array(), null, true);
	}

	// Legal PAGES CSS
	if (is_page('privacy-policy') || is_page('terms')) {
		wp_enqueue_style('single-news-css', get_theme_file_uri('/styles/legals.css'), array(), null);
	}

	// CONTACT page css
	if (is_page('contact')) {
		wp_enqueue_style('contact-css', get_theme_file_uri('./styles/contact.css'), array(), null);
		wp_enqueue_script('scroll-zoom-js', get_template_directory_uri() . '/js/scroll-zoom.js', array(), null, true);
	}
}
add_action('wp_enqueue_scripts', 'custom_theme_scripts');

// CUSTOM FUNCTION FOR NEWS PAGE
//require get_theme_file_path('/inc/news-functions.php');

// CUSTOM FUNCTION FOR PORTFOLIO PAGE
//require get_theme_file_path('/inc/portfolio-functions.php');

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';


// Filters for team and portfolio page
//require get_template_directory() . '/inc/team-functions.php';


//Adding a span tag inside each anchor tag in menu bar
function add_span_to_menu($item_output, $item, $depth, $args)
{
	$title = $item->title;
	$new_title = '<span>' . $title . '</span>';
	$item_output = str_replace($title, $new_title, $item_output);
	return $item_output;
}
add_filter('walker_nav_menu_start_el', 'add_span_to_menu', 10, 4);
