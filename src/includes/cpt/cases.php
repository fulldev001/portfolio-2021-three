<?php
// Register Custom Post Type
function Cases() {

	$labels = array(
		'name'                  => _x( 'Cases', 'Post Type General Name', 'case' ),
		'singular_name'         => _x( 'Case', 'Post Type Singular Name', 'case' ),
		'menu_name'             => __( 'Cases', 'case' ),
		'name_admin_bar'        => __( 'Case', 'case' ),
		'archives'              => __( 'Case Archives', 'case' ),
		'attributes'            => __( 'Case Attributes', 'case' ),
		'parent_item_colon'     => __( 'Parent Case:', 'case' ),
		'all_items'             => __( 'All Cases', 'case' ),
		'add_new_item'          => __( 'Add New Case', 'case' ),
		'add_new'               => __( 'Add New', 'case' ),
		'new_item'              => __( 'New Case', 'case' ),
		'edit_item'             => __( 'Edit Case', 'case' ),
		'update_item'           => __( 'Update Case', 'case' ),
		'view_item'             => __( 'View Case', 'case' ),
		'view_items'            => __( 'View Cases', 'case' ),
		'search_items'          => __( 'Search Cases', 'case' ),
		'not_found'             => __( 'Not found', 'case' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'case' ),
		'featured_image'        => __( 'Featured Image', 'case' ),
		'set_featured_image'    => __( 'Set featured image', 'case' ),
		'remove_featured_image' => __( 'Remove featured image', 'case' ),
		'use_featured_image'    => __( 'Use as featured image', 'case' ),
		'insert_into_item'      => __( 'Insert into case', 'case' ),
		'uploaded_to_this_item' => __( 'Uploaded to this case', 'case' ),
		'items_list'            => __( 'Cases list', 'case' ),
		'items_list_navigation' => __( 'Cases list navigation', 'case' ),
		'filter_items_list'     => __( 'Filter cases list', 'case' ),
	);
	$rewrite = array(
		'slug'                  => 'case',
		'with_front'            => true,
		'pages'                 => true,
		'feeds'                 => true,
	);
	$args = array(
		'label'                 => __( 'Case', 'case' ),
		'description'           => __( 'Cases', 'case' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-admin-customizer',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'rewrite'               => $rewrite,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	);
	register_post_type( 'case', $args );

}
add_action( 'init', 'Cases', 0 );
