## 06 バックエンドの実装

- `$ php artisan make:controller Api/AuthController`を実行<br>

* `routes/api.php`を編集<br>

```php:api.php
<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
  Route::post('logout', [AuthController::class, 'logount']);
});
```

- `app/Http/Controllers/Api/AuthController.php`を編集<br>

```php:AuthController.php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => 'required|max:191',
      'email' => 'required|email|max:191|unique:users,email',
      'password' => 'required|min:8',
    ]);

    if ($validator->fails()) {
      return response()->json([
        'validation_errors' => $validator->messages(),
      ]);
    } else {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
      ]);

      $token = $user->createToken($user->email . '_Token')->plainTextToken;

      return response()->json([
        'status' => 200,
        'username' => $user->name,
        'token' => $token,
        'message' => 'Registerd Successfully',
      ]);
    }
  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required',
      'password' => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json([
        'validation_errors' => $validator->messages(),
      ]);
    } else {
      $user = User::where('email', $request->email)->first();
      if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
          'status' => 401,
          'message' => '入力情報が不正です',
        ]);
      } else {
        $token = $user->createToken($user->email . '_Token')->plainTextToken;

        return response()->json([
          'status' => 200,
          'username' => $user->name,
          'token' => $token,
          'message' => 'ログインに成功しました。',
        ]);
      }
    }
  }

  public function logout()
  {
    auth()
      ->user()
      ->tokens()
      ->delete();

    return response()->json([
      'status' => 200,
      'message' => 'ログアウト成功',
    ]);
  }
}
```
