<?php
namespace Matise\Settings;

class Matise_ACF {
	/**
	 * Constructor to init acf
	 */
	public function __construct() {
		//filter for acf update and format values
		add_action('acf/init', array($this, 'register_block_types'));
		add_filter('allowed_block_types', array($this, 'allowed_blocks_types'), 10, 2 );
	}

	/**
	 * Register block types
	 */
	public function register_block_types() {
		// check function exists
		if (function_exists('acf_register_block_type')) {
			// Homepage grid
			acf_register_block_type(
				array(
					'name'								=> 'homepage-grid',
					'title'								=> __('Homepage grid'),
					'description'					=> __('Homepage grid'),
					'render_callback'			=> array($this, 'render_callback'),
					'category'						=> 'header', // Category defines where the block is set in the gutenberg editor block picker.
					// 'icon'								=> svg('header'), // You can use dashicons or custom svg element
					'align'								=> 'full',
					'keywords'						=> array( 'header', 'regular'),
					'supports' 						=> array(
						'align' 						=> false,
						'mode'							=> false
					),
					'mode' 								=> 'edit'
				)
			);
			// Case details
			acf_register_block_type(
				array(
					'name'								=> 'case-details',
					'title'								=> __('Case details'),
					'description'					=> __('Case details'),
					'render_callback'			=> array($this, 'render_callback'),
					'category'						=> 'header', // Category defines where the block is set in the gutenberg editor block picker.
					// 'icon'								=> svg('header'), // You can use dashicons or custom svg element
					'align'								=> 'full',
					'keywords'						=> array( 'header', 'regular'),
					'supports' 						=> array(
						'align' 						=> false,
						'mode'							=> false
					),
					'mode' 								=> 'edit'
				)
			);
			// Full screen media
			acf_register_block_type(
				array(
					'name'								=> 'full-screen-media',
					'title'								=> __('Full screen media'),
					'description'					=> __('Full screen media'),
					'render_callback'			=> array($this, 'render_callback'),
					'category'						=> 'header', // Category defines where the block is set in the gutenberg editor block picker.
					// 'icon'								=> svg('header'), // You can use dashicons or custom svg element
					'align'								=> 'full',
					'keywords'						=> array( 'header', 'regular'),
					'supports' 						=> array(
						'align' 						=> false,
						'mode'							=> false
					),
					'mode' 								=> 'edit'
				)
			);
			// Media grid
			acf_register_block_type(
				array(
					'name'								=> 'media-grid',
					'title'								=> __('Media grid'),
					'description'					=> __('Media grid'),
					'render_callback'			=> array($this, 'render_callback'),
					'category'						=> 'header', // Category defines where the block is set in the gutenberg editor block picker.
					// 'icon'								=> svg('header'), // You can use dashicons or custom svg element
					'align'								=> 'full',
					'keywords'						=> array( 'header', 'regular'),
					'supports' 						=> array(
						'align' 						=> false,
						'mode'							=> false
					),
					'mode' 								=> 'edit'
				)
			);
			// Text
			acf_register_block_type(
				array(
					'name'								=> 'text',
					'title'								=> __('Text'),
					'description'					=> __('Text'),
					'render_callback'			=> array($this, 'render_callback'),
					'category'						=> 'header', // Category defines where the block is set in the gutenberg editor block picker.
					// 'icon'								=> svg('header'), // You can use dashicons or custom svg element
					'align'								=> 'full',
					'keywords'						=> array( 'header', 'regular'),
					'supports' 						=> array(
						'align' 						=> false,
						'mode'							=> false
					),
					'mode' 								=> 'edit'
				)
			);
		}
	}

	/**
	 * Callback function of acf_register_block
	 * Refers to sections folder
	 * Output is defined in WP Core, otherwise it is looking for the file
	 */
	public function render_callback($block) {
		global $output;
		if ($output === 'json') {
			echo json_encode(get_fields());
			return;
		} else {
			$slug = str_replace('acf/', '', $block['name']);
			// include a template part from within the "acf-blocks" folder
			if (file_exists(get_theme_file_path("/includes/components/acf-blocks/{$slug}/index.php"))) {
include(get_theme_file_path("/includes/components/acf-blocks/{$slug}/index.php") );
			} else {
				echo json_encode(get_fields());
				return;
			}
		}
	}

	/**
	 * Filter blocks on pages
	 */
	public function allowed_blocks_types($allowed_blocks, $post) {
		$homepage_id = get_option('page_on_front');
		$allowed = array(
			'acf/homepage-grid',
			'acf/case-details',
			'acf/full-screen-media',
			'acf/media-grid',
			'acf/text'
		);
		return $allowed;
	}
}
new Matise_ACF();
