# Laravel+React で SPA 認証の構築

https://qiita.com/hexanitrobenzen/items/a2241e4b925dfdc3e67b <br>

## 01 Laravel UI の導入と React の導入、通常の認証用のテンプレート導入

- `composer require laravel/ui`を実行<br>

* `$ php artisan ui react --auth`を実行<br>

- `$ npm install && npm run dev`を実行<br>

## 02 React-Router, React-Router-Dom の導入

- `$ npm install react-router-dom@5.*`を実行<br>

## 02 既存のファイルの変更

- `resorces/views/layouts/app.blade.php`を編集<br>

```html:app.blade.php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- 編集 -->
    <!-- Scripts -->
    <script src="{{ asset(mix('js/app.js')) }}" defer></script>
    <!-- ここまで -->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css?family=Nunito"
      rel="stylesheet"
    />

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
    @yield('style')
  </head>

  <body>
    <!-- 編集 -->
    <div id="app">
      @yield('content')
    </div>
    @yield('script')
    <!-- ここまで -->
  </body>
</html>
```

- `$ touch resources/views/index.blade.php`を実行<br>

* `resources/views/index.blade.php`を編集<br>

```html:index.blade.php
@extends('layouts.app') @section('content')
<!-- Reactコンポーネントの呼び出し箇所 -->
<div id="nav"></div>
@endsection
```

- `routes/web.php`を編集<br>

```php:web.php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
  return view('index');
})->where('any', '.*');
```

- `resources/js/app.js`を編集<br>

```js:app.js
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap')

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// 編集
require('./components/App')
```
