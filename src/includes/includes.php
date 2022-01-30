<?php
//===================
// Helper functions
//===================
require_once('helper-functions.php');

//===================
// Matise theme Development essentials
//===================
require_once('field-groups/acf.php');

//===================
// Theme specific functions functions
//===================
require_once('settings/index.php');
require_once('cpt/cases.php');

//===================
// Components and partials
//===================
require_once('svgs/generate.php');

// Filter links
// 
// function my_acf_load_value( $value, $post_id, $field ) {
//     debug($value);
//     return $value;
// }
//
// // Apply to all fields.
// add_filter('acf/load_value/type=link', 'my_acf_load_value', 10, 3);
