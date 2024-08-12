/**
 * @swagger
 * tags:
 *   name: Rules
 *   description: API para gerenciar regras
 * 
 * definitions:
 *   Rule:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: ID da regra
 *       name:
 *         type: string
 *         description: Nome da regra
 *       description:
 *         type: string
 *         description: Descrição da regra
 *       precoBasePorLitro:
 *         type: number
 *         description: Preço base por litro
 *       custoKmAte50Km:
 *         type: number
 *         description: Custo por km até 50km
 *       custoPorKmMaisDe50Km:
 *         type: number
 *         description: Custo por km mais de 50km
 *       bonusProducaoAcima:
 *         type: number
 *         description: Bônus produção acima
 *       mesVigencia:
 *         type: date
 *         description: Mês de vigência
 * 
 * /rules:
 *   get:
 *     tags:
 *       - Rules
 *     summary: Retorna todas as regras
 *     responses:
 *       '200':
 *         description: Lista de regras retornada com sucesso
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Rule'
 *   post:
 *     tags:
 *       - Rules
 *     summary: Cria uma nova regra
 *     parameters:
 *       - name: rule
 *         in: body
 *         description: Objeto da regra a ser criada
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Rule'
 *     responses:
 *       '201':
 *         description: Regra criada com sucesso
 *         schema:
 *           $ref: '#/definitions/Rule'
 * 
 * /rules/{id}:
 *   get:
 *     tags:
 *       - Rules
 *     summary: Retorna uma regra específica pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da regra a ser retornada
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Regra encontrada com sucesso
 *         schema:
 *           $ref: '#/definitions/Rule'
 *   put:
 *     tags:
 *       - Rules
 *     summary: Atualiza uma regra existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da regra a ser atualizada
 *         required: true
 *         type: string
 *       - name: rule
 *         in: body
 *         description: Objeto da regra atualizada
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Rule'
 *     responses:
 *       '200':
 *         description: Regra atualizada com sucesso
 *         schema:
 *           $ref: '#/definitions/Rule'
 *   delete:
 *     tags:
 *       - Rules
 *     summary: Deleta uma regra existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da regra a ser deletada
 *         required: true
 *         type: string
 *     responses:
 *       '204':
 *         description: Regra deletada com sucesso
 */