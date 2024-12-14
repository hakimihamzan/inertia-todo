<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'todos' => Todo::all(),
        ]);
    }
}
