using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AgregaCategoriaDeServicio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoriaDeServicioId",
                table: "Servicios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CategoriaDeServicio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriaDeServicio", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Servicios_CategoriaDeServicioId",
                table: "Servicios",
                column: "CategoriaDeServicioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Servicios_CategoriaDeServicio_CategoriaDeServicioId",
                table: "Servicios",
                column: "CategoriaDeServicioId",
                principalTable: "CategoriaDeServicio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Servicios_CategoriaDeServicio_CategoriaDeServicioId",
                table: "Servicios");

            migrationBuilder.DropTable(
                name: "CategoriaDeServicio");

            migrationBuilder.DropIndex(
                name: "IX_Servicios_CategoriaDeServicioId",
                table: "Servicios");

            migrationBuilder.DropColumn(
                name: "CategoriaDeServicioId",
                table: "Servicios");
        }
    }
}
