import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function CreateTodoListForm({
    className = '',
}: {
    className?: string;
}) {
    const { auth } = usePage().props


    const todoInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        post,
        transform,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        todo: '',
        user_id: '',
    });

    const addTodo: FormEventHandler = (e) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            user_id: auth.user.id
        }))

        post(route('todos.create'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {},
        });
    };

    return (
        <section className={className}>
            <form onSubmit={addTodo} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="todo" value="Add Todo" />

                    <div className='flex gap-2'>
                        <TextInput
                            id="todo"
                            ref={todoInput}
                            value={data.todo}
                            onChange={(e) => setData('todo', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            required
                        />

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Save
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </div>

                    <InputError message={errors.todo} className="mt-2" />
                </div>
            </form>
        </section>
    );
}
