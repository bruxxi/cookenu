##Cookenu


Esse produto nada mais é do que uma rede social, na qual os usuários podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. Ela possui todas as funcionalidades mais comuns em redes sociais:

1. **Cadastro**

    Como o projeto está no início, o usuário só precisa informar: o e-mail, nome a sua senha para realizar o cadastro. A senha tem uma regra: ela deve conter, no mínimo, 6 caracteres. 

2. **Login**

    Basta informar o email e a senha corretamente que o usuário poderá se logar na aplicação. Os endpoints de login e cadastro devem retornar **um** **token.**

3. **Informações do próprio perfil**

    A partir do token de autenticação fornecido no login, o usuário deve ser capaz de ver as suas informações não sensíveis salvas no banco (id e email)

4. **Criar receitas**

    O usuário deve poder criar uma receita. A receita deve ter os seguintes atributos: título, descrição/modo de preparo e data de criação

5. **Seguir usuário**

    Um usuário deve poder seguir outros usuários. Para isso, ele deve fornecer o id do usuário que deseja seguir. Atente-se que essa funcionalidade se assemelha ao do instagram: um usuário seguir outro, não significa que "esse outro" está seguindo o primeiro.

6. **Feed**

    Um usuário deve poder visualizar as receitas criadas pelos usuários que ele segue. As receitas devem estar ordenadas pela data de criação.

- **Endpoints mínimos para o MVP**

    Todos os endpoints, com exceção do Signup e Login, devem exigir autenticação.

    - **Signup**

        **Método:** POST
        **Path:** `/signup`

        **Entradas:**

        Body

        ```json
        {
        	"name": "Alice",
        	"email": "alice@lbn.com",
        	"password": "123456"
        }
        ```

        **Saídas**

        Body

        ```json
        {
        	"access_token": "token de acesso"
        }
        ```

        **Observações**:

        - O seu código deve validar se os três campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos
        - O seu código deve gerar o id do usuário

    - **Login**

        **Método:** POST
        **Path:** `/login`

        **Entradas:**

        Body

        ```json
        {
        	"email": "alice@lbn.com",
        	"password": "123456"
        }
        ```

        **Saídas**

        Body

        ```json
        {
        	"access_token": "token de acesso"
        }
        ```

        **Observações**:

        - O seu código deve validar se os dois campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos

    - **Pegar próprio perfil**

        **Método:** GET
        **Path:** `/user/profile`

        **Entradas:**

        Headers

        ```
        Authorization: "token de autenticação"
        ```

        **Saídas**

        Body

        ```json
        {
        	"id": "id do usuário",
        	"name": "Alice",
        	"email": "alice@lbn.com"
        }
        ```

    - **Pegar perfil de outro usuário**

        **Método:** GET
        **Path:** `/user/:id`

        **Entradas:**

        Path Param

        ```
        id: "id do usuário"
        ```

        Headers

        ```
        Authorization: "token de autenticação"
        ```

        **Saídas**

        Body

        ```json
        {
        	"id": "id do usuário",
        	"name": "Bob",
        	"email": "bob@lbn.com"
        }
        ```

    - **Criar receita**

        **Método:** POST
        **Path:** `/recipe`

        **Entradas:**

        Headers

        ```
        Authorization: "token de autenticação"
        ```

        Body

        ```json
        {
        	"title": "título da receita",
        	"description": "descrição da receita"
        }
        ```

        **Observações**:

        - Perceba que, no banco de dados, devemos guardar a data de criação da receita, mas o usuário não envia. Você deve assumir que a receita foi criada no momento em que o usuário bate nessa requisição

    - **Pegar receita**

        **Método:** GET
        **Path:** `/recipe/:id`

        **Entradas:**

        Path Param

        ```
        id: "id da receita"
        ```

        Headers

        ```
        Authorization: "token de autenticação"
        ```

        **Saídas**

        Body

        ```json
        {
        	"id": "id da receita",
        	"title": "Ovo Frito",
        	"description": "Pega o ovo, põe na frigideira e reza!"
        	"cratedAt": "31/12/2020"
        }
        ```

- **Desafios**
    - **Seguir usuário**

        **Método:** POST
        **Path:** `/user/follow`

        **Entradas:**

        Headers

        ```
        Authorization: "token de autenticação"
        ```

        Body

        ```json
        {
        	"userToFollowId": "id do usuário que se deseja seguir"
        }
        ```

        **Saídas**

        Body

        ```json
        {
        	"message": "Followed successfully"
        }
        ```

        **Observações**:

        - Você deve verificar se o id do usuário é válido (se não está vazio ou se não foi enviado)

    - **Deixar de seguir usuário**

        **Método:** POST
        **Path:** `/user/unfollow`

        **Entradas:**

        Headers

        ```
        Authorization: "token de autenticação"
        ```

        Body

        ```json
        {
        	"userToUnfollowId": "id do usuário que se deseja deixar de seguir"
        }
        ```

        **Saídas**

        Body

        ```json
        {
        	"message": "Unfollowed successfully"
        }
        ```

        **Observações**:

        - Você deve verificar se o id do usuário é válido (se não está vazio ou se não foi enviado)

    - **Pegar feed de receitas**

        Este endpoint deve trazer todas as receitas criadas por pessoas que a pessoa logada (o id que está no token) segue.

        **Método:** GET
        **Path:** `/user/feed`

        **Entradas:**

        Headers

        ```
        Authorization: "token de autenticação"
        ```

        **Saídas**

        Body

        ```json
        {
        	"recipes": [{
        			"id": "id da receita",
        			"title": "título da receita",
        			"description": "descrição da receita",
        			"createdAt": "31/12/2020",
        			"userId": "id do usuário que criou a receita",
        			"userName": "nome do usuário que criou a receita"
        	}]
        }
        ```

    - **Criar mais um tipo de usuário**

        Agora, você deve adicionar na sua aplicação um `role` para representar o tipo de usuário. Faça as alterações necessárias no `signup`, `login` e geração do token

    Daqui para baixo, há somente a descrição do que cada uma das funcionalides faz. Agora é pensar com calma e:

    - Definir se um endpoint é suficiente;
    - Escolher o método/verbo;
    - Criar validações de input;
    - Definir o formato de saída;
    - Verificar se algum outro endpoint deverá ser modificado
    - **Editar receita**
        - Um usuário "normal" deve ser capaz de uma receita própria dele.
        - Você deve retornar um erro se a receita não for dele

    - **Deletar receita**
        - Um usuário "normal" deve ser capaz de uma receita própria dele.
        - Você deve retornar um erro se a receita não for dele
        - Agora, se o usuário que tentar acessar essa receita for um admin, você deve permitir que ele delete qualquer post que ele passar

         

    - D**eletar conta**
        - Um usuário "admin" deve ser capaz de deletar a conta de qualquer usuário
        - Você deve retornar um erro se o usuário que acessou essa funcionalidade não for um admin
        - Quando for deletar o usuário, lembre-se que você deve deletar todas as relações do MySQL com a qual ele esteja envolvido: receita e usuários que segue

    - **Esqueci a senha**
        - Crie um endpoint que envie um e-mail e altere a senha do usuário