<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    public function check(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['user'] = $user;

            if (Auth::check()) {
                return response()->json([
                    'status' => true,
                    'data' => $success,
                    'message' => "Successful Login"
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => "Invalid Email Or Password"
                ]);
            }
            // exit();

            // return response()->json([
            //     'status' => true,
            //     'data' => $success,
            //     'message' => "Successful Login"
            // ]);
        }

        return response()->json([
            'status' => false,
            'message' => "Invalid Email Or Password"
        ]);
    }
}
