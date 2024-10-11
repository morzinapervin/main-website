<?php

// CUSTOM THEME CUSTOMIZER
function custom_theme_customize_register($wp_customize)
{
	$wp_customize->get_setting('blogname')->transport         = 'postMessage';
	$wp_customize->get_setting('blogdescription')->transport  = 'postMessage';
	$wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

	if (isset($wp_customize->selective_refresh)) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'custom_theme_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'custom_theme_customize_partial_blogdescription',
			)
		);
	}


	// Custom section to add tracking code in head 
	$wp_customize->add_section('custom_head_code', array(
		'title' => __('Code'),
		'description' => __('Add custom Code here'),
		'panel' => '', // Not typically needed.
		'priority' => 105,
		'capability' => 'edit_theme_options',
		'theme_supports' => '', // Rarely needed.
	));

	$wp_customize->add_setting('custom_head_code', array(
		'default' => ''
	));

	$wp_customize->add_control('custom_head_code', array(
		'type' => 'textarea',
		'priority' => 10,
		'section' => 'custom_head_code',
		'label' => 'Head Code'
	));
}
add_action('customize_register', 'custom_theme_customize_register');

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function custom_theme_customize_partial_blogname()
{
	bloginfo('name');
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function custom_theme_customize_partial_blogdescription()
{
	bloginfo('description');
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function custom_theme_customize_preview_js()
{
	wp_enqueue_script('custom_theme_customizer', get_template_directory_uri() . '/js/customizer.js', array('customize-preview'), CUSTOM_THEME_VERSION, true);
}
add_action('customize_preview_init', 'custom_theme_customize_preview_js');
